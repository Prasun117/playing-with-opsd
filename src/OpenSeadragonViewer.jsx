import React, { useEffect, useRef } from "react";
import OpenSeadragon from "openseadragon";

const OpenSeadragonViewer = ({ tileSource }) => {
  const viewerRef = useRef(null); // Reference for the OpenSeadragon container
  const osdViewer = useRef(null); // Reference to store the OpenSeadragon viewer instance

  useEffect(() => {
    // Initialize OpenSeadragon viewer when component mounts
    osdViewer.current = OpenSeadragon({
      element: viewerRef.current,
      tileSources: tileSource,
      prefixUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/2.4.2/images/", // Set control icons URL
      defaultZoomLevel: 1, // Optional: sets the default zoom level
    });

    osdViewer.current.addHandler("zoom", (e) => {
      console.log("triggered zoom", e);
    });
    osdViewer.current.addHandler("pan", (e) => {
      console.log("triggered pan", e);
    });
    // Clean up the viewer instance on component unmount
    return () => {
      if (osdViewer.current) {
        osdViewer.current.destroy();
      }
    };
  }, [tileSource]); // Reinitialize if tileSource changes

  return (
    <div
      ref={viewerRef}
      style={{ width: "100%", height: "600px" }} // Adjust height and width as needed
    />
  );
};

export default OpenSeadragonViewer;
