import { useState } from "react";
import {Searchbar} from 'components/Searchbar/Searchbar'
import {ImageGallery} from 'components/ImageGallery/ImageGallery'




export function App() {
  const [request, setRequest] = useState('')


    const submitForm = state => {
      const request = state.trim()
        if (request !== '') {
          setRequest(state);
        }
  };

    return (
      <>
        <Searchbar onSubmit={submitForm} />

        <ImageGallery request={request} />
      
      </>
    );
}