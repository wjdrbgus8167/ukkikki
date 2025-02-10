// PlaceSelectionResult.jsx
import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { PlaceSelectionResultContainer } from './style/PlaceSelectionResultStyle';

const PlaceSelectionResult = ({ selectedDay, isCollapsed }) => {
  const [places, setPlaces] = useState(selectedDay?.selectedPlaces || []);
  const [changeOrder, setChangeOrder] = useState([]);

  useEffect(() => {
    setPlaces(selectedDay?.selectedPlaces || []);
  }, [selectedDay]);

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return; // 드래그 취소 시 처리

    const items = Array.from(places);
    const [targetItem] = items.splice(source.index, 1); // 소스에서 아이템 제거
    items.splice(destination.index, 0, targetItem); // 대상 위치에 아이템 추가
    setPlaces(items);

    const newOrder = items.map((item) => item.id);
    setChangeOrder(newOrder);
  };

  return (
    <PlaceSelectionResultContainer isCollapsed={isCollapsed}>
      <h2>
        {selectedDay?.label} ({selectedDay?.date})의 선택된 장소
      </h2>
      {!isCollapsed && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-2"
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
        </DragDropContext>
      )}
    </PlaceSelectionResultContainer>
  );
    
    
};

export default PlaceSelectionResult;
