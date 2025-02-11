import React, { useContext, useState } from 'react';
import DateSidebar from './DateSidebar';
import PlaceSelection from './PlaceSelection';
import PlaceSelectionResult from './PlaceSelectionResult';
import MapDisplay from './MapDisplay';
import DetailForm from './DetailForm';
import { LoadScript } from '@react-google-maps/api';
import { StyledLoadScript, StyledPlaceSelectionResult } from './style/MainLayoutStyle';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import ProposalDetailContext from '../../contexts/ProposalDetailContext';

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const MainLayout = () => {
    const { proposal } = useContext(ProposalDetailContext);
    console.log('MainLayout proposal:', proposal);


    // proposal이 없으면 로딩 상태로 처리
    if (!proposal || !proposal.data || !proposal.data.travelPlan) {
      return <div>Loading...</div>;
    }

    const { arrivalCity, startDate, endDate, places } = proposal.data.travelPlan;

    const getTravelDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
        return Array.from({ length: diffDays }, (_, i) => ({
            id: i + 1,
            label: `${i + 1}일차`,
            date: new Date(start.getTime() + i * 86400000).toISOString().split('T')[0],
            selectedPlaces: [],
        }));
    };

    const initialTravelDays = getTravelDays(startDate, endDate);

    const [travelDays, setTravelDays] = useState(initialTravelDays);
    const [selectedDayId, setSelectedDayId] = useState(travelDays[0]?.id || 1);
    const [showDetailFrom, setShowDetailFrom] = useState(false);
    const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

    const handleDaySelect = (dayId) => {
        setSelectedDayId(dayId);
        setShowDetailFrom(false);
    };

    const handleAddPlace = (place) => {
        setTravelDays((prevDays) =>
            prevDays.map((day) =>
                day.id === selectedDayId
                    ? { ...day, selectedPlaces: [...new Set([...day.selectedPlaces, place])] }
                    : day
            )
        );
    };

    const handleTogglePlace = (place) => {
        if (!place.latitude || !place.longitude) {
            console.error('경도 또는 위도가 없습니다!', place);
            return;
        }
        setTravelDays((prevDays) =>
            prevDays.map((day) =>
                day.id === selectedDayId
                    ? {
                        ...day,
                        selectedPlaces: day.selectedPlaces?.some((p) => p.id === place.id)
                            ? day.selectedPlaces.filter((p) => p.id !== place.id)
                            : [...(day.selectedPlaces || []), place],
                    }
                    : day
            )
        );
    };

    const selectedDay = travelDays.find((day) => day.id === selectedDayId);

    const onToggleDetailForm = () => {
        setShowDetailFrom((prev) => !prev);
    };

    return (
        <div className="flex w-full h-screen">
            <div className="w-1/10 border-r flex-shrink-0">
                <DateSidebar
                    travelDays={travelDays}
                    selectedDayId={selectedDayId}
                    onDaySelect={handleDaySelect}
                    onToggleDetailForm={onToggleDetailForm}
                />
            </div>

            {showDetailFrom ? (
                <div className="flex-grow h-full">
                    <DetailForm />
                </div>
            ) : (
                <>
                    <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
                        <StyledLoadScript>
                            <PlaceSelection
                                arrivalCity={arrivalCity.name}
                                startDate={startDate}
                                endDate={endDate}
                                places={places}
                                onTogglePlace={handleTogglePlace}
                                selectedPlaces={selectedDay?.selectedPlaces || []}
                            />
                        </StyledLoadScript>
                    </LoadScript>

                    {/* PlaceSelectionResult와 토글 버튼을 flex 컨테이너로 나란히 배치 */}
                    <div className="flex items-center">
                        <StyledPlaceSelectionResult isCollapsed={isPanelCollapsed}>
                            <PlaceSelectionResult
                                selectedDay={selectedDay ?? { selectedPlaces: [] }}
                                isCollapsed={isPanelCollapsed}
                            />
                        </StyledPlaceSelectionResult>
                        <button
                            onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
                            className="ml-2 bg-white border rounded-full shadow p-2"
                        >
                            {isPanelCollapsed ? <AiOutlineRight size={20} /> : <AiOutlineLeft size={20} />}
                        </button>
                    </div>

                    <div className="flex-grow h-full">
                        <MapDisplay
                            departureCity={arrivalCity.name}
                            selectedPlaces={selectedDay?.selectedPlaces || []}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default MainLayout;
