//장소 리스트
import React, { useContext } from "react";
import ProposalDetailContext from "../../contexts/proposalDetailContext";

const PlaceList = () => {
  const { proposal } = useContext(ProposalDetailContext);

  return (
    <div className="container">
      <div className="travel-place">
        {proposal.travelPlan.places.map((place, index) =>(
          <div key= {index}>
            <h3>{place.name}</h3>
            <p>{place.address}</p>
              {place.placeTags.map((tag, idx) => (
                <div key ={idx}>
                  # {tag.placeTagName}
                </div>
              ))}
          </div>
        ))

        }
      </div>

    </div>
  )
}; 
export default PlaceList;