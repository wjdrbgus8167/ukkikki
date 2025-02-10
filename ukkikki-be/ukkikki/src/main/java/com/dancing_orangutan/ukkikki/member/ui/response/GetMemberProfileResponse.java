package com.dancing_orangutan.ukkikki.member.ui.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetMemberProfileResponse {
    private final String email;
    private final String name;
    private final String profileImageUrl;
}
