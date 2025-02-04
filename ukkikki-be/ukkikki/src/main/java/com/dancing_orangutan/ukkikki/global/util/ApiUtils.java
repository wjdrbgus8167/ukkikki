package com.dancing_orangutan.ukkikki.global.util;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public class ApiUtils {

	private static final String SUCCESS = "Success";
	private static final String FAILED = "Failed";

	// 성공 API 응답 생성
	public static <T> ApiResponse<T> success(T data) {
		return new ApiResponse<>(HttpStatus.OK.value(), SUCCESS, data, null);
	}

	// 예외로 인한 오류 API 응답 생성
	public static ApiResponse<?> error(String code, Throwable throwable, HttpStatus status) {
		return new ApiResponse<>(
				status.value(),
				FAILED,
				null,
				new ApiError(code, throwable)
		);
	}

	// 메시지로 인한 오류 API 응답 생성
	public static ApiResponse<?> error(String code, String message, HttpStatus status) {
		return new ApiResponse<>(
				status.value(),
				FAILED,
				null,
				new ApiError(code, message)
		);
	}

	@Getter
	public static class ApiResponse<T> {

		private final int status;
		private final String message;
		private final T data;
		private final ApiError error;

		public ApiResponse(int status, String message, T data, ApiError error) {
			this.status = status;
			this.message = message;
			this.data = data;
			this.error = error;
		}

	}

	@Getter
	public static class ApiError {

		private final String code;
		private final String message;

		ApiError(String code, String message) {
			this.code = code;
			this.message = message;
		}

		ApiError(String code, Throwable throwable) {
			this.code = code;
			this.message = throwable.getMessage();
		}
	}
}
