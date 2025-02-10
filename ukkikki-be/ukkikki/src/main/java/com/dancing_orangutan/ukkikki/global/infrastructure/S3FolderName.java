package com.dancing_orangutan.ukkikki.global.infrastructure;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum S3FolderName {
    PROFILE("profile"),
    SCHEDULE("schedule");

    private final String folderName;

//    public String getFolderName() {
//        return folderName;
//    }
    public String getFullPath(String fileName) {
        return this.folderName + "/" + fileName;
    }
}
