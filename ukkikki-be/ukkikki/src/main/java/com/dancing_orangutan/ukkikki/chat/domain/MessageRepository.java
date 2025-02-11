package com.dancing_orangutan.ukkikki.chat.domain;


public interface MessageRepository {

    MessageEntity save(MessageEntity message);
}
