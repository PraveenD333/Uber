import React from "react"

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion.description)
    } else if (activeField === 'destination') {
      setDestination(suggestion.description)
    }
    // setPanelOpen(false)
    // setVehiclePanel(true)
  }

  return (
    <div className="px-4 py-3">
      {suggestions.map((elem, idx) => (

        <div key={idx} onClick={() => handleSuggestionClick(elem)}
          className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start">

          {/* Icon for location */}
          <div className="bg-[#eee] h-8 w-12 rounded-full flex items-center justify-center">
            <i className="ri-map-pin-fill"></i>
          </div>
          {/* Text for the location */}
          <div className="flex-1">
            <h4 className="font-medium text-sm text-gray-800">{elem.description}</h4>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel
