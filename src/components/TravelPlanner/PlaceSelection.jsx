// 장소 리스트 컴포넌트
import React, { useContext } from "react";
import ProposalDetailContext from '../../contexts/ProposalDetailContext';


const PlaceSelection = () => {

    const {proposal} = useContext(ProposalDetailContext);

    if (!proposal) {
        return <div>로딩중</div>
    }

    const { places } = proposal.data.travelPlan;
    
    return (
        <div>
            <div>
                dh
            </div>
        </div>
    );
};

export default PlaceSelection;