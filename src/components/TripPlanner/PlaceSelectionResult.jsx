// 드로그 앤 드랍 패널을 닫지 않고 실행될 수 있도록 하기(수정)

import React, { useState, useEffect } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const PlaceSelectionResult = ({ selectedDay }) => {



  const [isCollapsed, setIsCollapsed] = useState(false);
  const [places, setPlaces] = useState(selectedDay?.selectedPlaces || []);
  const [changeOrder, setChangeOrder] = useState([]);

  useEffect(() => {
    setPlaces(selectedDay?.selectedPlaces || []);
  }, [selectedDay]);

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return; // 드래그 취소된 경우 처리

    const items = Array.from(places);
    const [targetItem] = items.splice(source.index, 1); // 소스에서 아이템 제거
    items.splice(destination.index, 0, targetItem); // 대상 위치에 아이템 추가
    setPlaces(items);

    const newOrder = items.map((item) => item.id);
    setChangeOrder(newOrder);
  };

  return (
    <div className="relative flex">
      {/* 접기/펼치기 버튼 (오른쪽 사이드) */}
      <button
        onClick={() => setIsCollapsed((prev) => !prev)}
        className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition-colors"
      >
        {isCollapsed ? (
          <AiOutlineLeft size={20} />
        ) : (
          <AiOutlineRight size={20} />
        )}
      </button>

      <DragDropContext onDragEnd={onDragEnd}>
        {/* PlaceSelectionResult 패널 */}
        <div
          className={`p-4 bg-white shadow-md transition-all duration-300 ${
            isCollapsed ? 'w-0 overflow-hidden p-0' : 'w-full'
          }`}
        >
          <h2 className="text-xl font-bold">
            {selectedDay?.label} ({selectedDay?.date})의 선택된 장소
          </h2>
          {!isCollapsed && (
            <Droppable droppableId="droppable" isDropDisabled={false}>
              {(provided) => (
                <ul
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`space-y-2 ${isCollapsed ? 'invisible' : ''}`}
                >
                  {places.length > 0 ? (
                    places.map((item, idx) => (
                      <Draggable
                        key={item.id}
                        draggableId={`${item.id}`}
                        index={idx}
                        disableInteractiveElementBlocking
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="border-2 mb-2 p-4 bg-gray-100 rounded-md shadow-sm cursor-move"
                          >
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.address}</p>
                            <p className="text-sm text-gray-600">👍: {item.likes}</p>
                          </li>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <p className="text-gray-500">선택된 장소가 없습니다.</p>
                  )}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          )}
        </div>
      </DragDropContext>
    </div>
  );
};

export default PlaceSelectionResult;
