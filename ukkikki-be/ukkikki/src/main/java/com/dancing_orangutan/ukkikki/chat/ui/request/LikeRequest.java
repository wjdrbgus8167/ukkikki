package com.dancing_orangutan.ukkikki.chat.ui.request;

public record LikeRequest(String address, double latitude, double longitude, String name, String photoUrl, String placeId, double rating, Integer travelPlanId, int likeCount) {


}
