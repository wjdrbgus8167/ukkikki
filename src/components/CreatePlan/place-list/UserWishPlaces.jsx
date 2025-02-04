// 사용자들이 가고자한 장소

import React from "react";
import packageSampleImage from "../../../assets/package_sample2.jpg";


const UserWishPlaces = () => {

    const wishlists = [
        {
            name: '글렌 알라키 증류소',
            address:'Distillery Cottages, Glenallachie, Aberlour AB38 9LR 영국',
            latitude: 57.47208460679224,
            longitude: -3.235839587055353,
            likesCnt: 10,
            imageUrl: packageSampleImage
        },
        {
            name: '아드벡 증류소',
            address:'Port Ellen, Isle of Islay PA42 7EA 영국',
            latitude: 55.640622696525305,
            longitude: -6.108250915342315,
            likesCnt: 7,
            imageUrl: packageSampleImage
        },
        {
            name: '라프로익 디스틸러리',
            address:'Laphroaig, 라프로에그 Isle of Islay PA42 7DU 영국',
            latitude: 55.63058946287993,
            longitude: -6.15198947096777,
            likesCnt: 6,
            imageUrl: packageSampleImage
        },
    ];

    return (
        <div>
            {wishlists.map((wishlist, idx) => {
                return (
                    <div key={idx} className="flex items-center p-4">
                        <img 
                        src={wishlist.imageUrl}
                        alt={wishlist.name} 
                        className="w-20 h-20 rounded-lg"
                        />
                        <div className="list-content flex-1 pl-2">
                        <h3 className="list-title text-x font-semibold">{wishlist.name}</h3>
                        <p className="list-address text-xs text-gray-400">{wishlist.address}</p>
                        <p className="list-likecnt mt-1 text-x text-gray-400">🐵: {wishlist.likesCnt}</p>
                        </div>
                        <button className="list-btn text-gray-400 text-3xl font-bold bg-gray-100 w-10 h-20 rounded-lg">
                            +
                        </button>
                    </div>
                );
                
            })}
        </div>
    );
};
export default UserWishPlaces;