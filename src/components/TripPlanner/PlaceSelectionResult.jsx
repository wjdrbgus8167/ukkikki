import React, { useState, useEffect } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const PlaceSelectionResult = ({ selectedDay }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [places, setPlaces] = useState([]);

  // 드래그 앤 드랍 순서 관리
  const handleOnDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.index !== source.index) {
      const reorderedPlaces = Array.from(places);
      const [movedPlace] = reorderedPlaces.splice(source.index, 1);
      reorderedPlaces.splice(destination.index, 0, movedPlace);
      setPlaces(reorderedPlaces);
    }
  };

  useEffect(() => {
    if (selectedDay?.selectedPlaces) {
      setPlaces(selectedDay.selectedPlaces);
    }
  }, [selectedDay]);

  return (
    <div className="relative flex">
      {/* 접기/펼치기 버튼 (오른쪽 사이드) */}
      <button
        onClick={() => setIsCollapsed((prev) => !prev)}
        className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition-colors"
      >
        {isCollapsed ? <AiOutlineLeft size={20} /> : <AiOutlineRight size={20} />}
      </button>

      {/* PlaceSelectionResult 패널 */}
      <div
        className={`p-4 bg-white shadow-md transition-all duration-300 ${
          isCollapsed ? 'w-0 p-0' : 'w-full'
        }`}
      >
        <h2 className="text-xl font-bold">
          {selectedDay?.label} ({selectedDay?.date})의 선택된 장소
        </h2>
        {/* Droppable 영역은 항상 렌더링하고, 보임 여부는 CSS로 제어 */}
        <div className={isCollapsed ? 'invisible' : 'visible'}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="places">
              {(provided) => (
                <ul
                  className="space-y-2"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {places.length > 0 ? (
                    places.map((place, index) => (
                      <Draggable
                        key={place.id}
                        draggableId={place.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="place-box border-2 mb-2 p-4 bg-gray-100 rounded-md shadow-sm cursor-move"
                          >
                            <p className="font-semibold">{place.name}</p>
                            <p className="text-sm text-gray-600">{place.address}</p>
                            <p className="text-sm text-gray-600">
                              좋아요: {place.likes}
                            </p>
                          </li>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <li className="text-gray-500 p-4">선택된 장소가 없습니다.</li>
                  )}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default PlaceSelectionResult;
