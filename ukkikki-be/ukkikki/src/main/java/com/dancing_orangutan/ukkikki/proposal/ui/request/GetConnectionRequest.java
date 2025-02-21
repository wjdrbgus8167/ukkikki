package com.dancing_orangutan.ukkikki.proposal.ui.request;

import lombok.Getter;

@Getter
public class GetConnectionRequest {

    private boolean isHost;
    private String memberName;

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }
    public void setIsHost(boolean isHost) {
        this.isHost = isHost;
    }
    public boolean getIsHost() {
        return isHost;
    }
}
