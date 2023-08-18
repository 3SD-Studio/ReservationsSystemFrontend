import React from "react"


import { useParams, useLocation } from "react-router-dom";
  



function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

export function EditEvent() {
    let { id } = useParams();
    let query = useQuery();
    if (query.get('editCode')) {
        return (
            <div>
                <h1>Event</h1>
                <h1>Event {query.get('editCode')}</h1>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Event {id}</h1>
            </div>
        )
    }
    
}  