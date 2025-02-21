package com.dancing_orangutan.ukkikki.proposal.domain.session;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "proposal_sessions")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SessionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer proposalSessionId;

    @Column(name = "proposal_id", nullable = false)
    private Integer proposalId;

    @Column(name = "session_id", nullable = false)
    private String sessionId;

    @Builder
    public SessionEntity(Integer proposalId, String sessionId) {
        this.proposalId = proposalId;
        this.sessionId = sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }
}
