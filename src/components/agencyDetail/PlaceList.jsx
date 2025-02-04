//장소 리스트

// import React, { useContext } from "react";
// import ProposalDetailContext from "../../contexts/proposalDetailContext";

// const PlaceList = () => {
//   const { proposal } = useContext(ProposalDetailContext);

//   return (
//     <div className="container">
//       <div className="travel-place">
//         {proposal.travelPlan.places.map((place, index) =>(
//           <div key= {index}>
//             <h3>{place.name}</h3>
//             <p>{place.address}</p>
//               {place.placeTags.map((tag, idx) => (
//                 <div key ={idx}>
//                   # {tag.placeTagName}
//                 </div>
//               ))}
//           </div>
//         ))

//         }
//       </div>

//     </div>
//   )
// }; 
// export default PlaceList;


import React from "react";

const PlaceList = () => {
  const proposalPlaces = [
           {
                name: '글렌 알라키 증류소',
                address:'Distillery Cottages, Glenallachie, Aberlour AB38 9LR 영국',
                latitude: 57.47208460679224,
                longitude: -3.235839587055353,
                placeTags: [
                  {
                    placeTagId: "1",
                    placeTagName: "가장예쁜 증류소"
                  },
                  {
                    placeTagId: "2",
                    placeTagName: "전망굿굿"
                  }
                ],
                likesCnt: 10,
            },
            {
                name: '아드벡 증류소',
                address:'Port Ellen, Isle of Islay PA42 7EA 영국',
                latitude: 55.640622696525305,
                longitude: -6.108250915342315,
                placeTags: [
                  {
                    placeTagId: "1",
                    placeTagName: "피트위스키 중 탑"
                  },
                  {
                    placeTagId: "2",
                    placeTagName: "맛조음음"
                  }
                ],
                likesCnt: 7,
            },
            {
                name: '라프로익 디스틸러리',
                address:'Laphroaig, 라프로에그 Isle of Islay PA42 7DU 영국',
                latitude: 55.63058946287993,
                longitude: -6.15198947096777,
                placeTags: [
                  {
                    placeTagId: "1",
                    placeTagName: "피트위스키 중 탑"
                  }
                ],
                likesCnt: 6,
            },
  ];

  return (
    <div className="place-container">
      {proposalPlaces.map((place, idx) => {
        return (
          <div key={idx} 
          className="place border-2 rounded-xl p-2 mb-2 w-auto h-24">
            <p className="place-name text-m font-semibold">{place.name}</p>
            <p className="place-address text-xs text-gray-400">{place.address}</p>
            {place.placeTags.map((tag, index) => {
              return (
                <div key={index}
                className="place-tag text-xs font-semibold" 
                >
                  # {tag.placeTagName}
                </div> 
              );
              })}
          </div>
        );
      })}
    </div>
  );
};
export default PlaceList;