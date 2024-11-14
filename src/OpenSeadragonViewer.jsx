import React, { useEffect, useRef } from "react";
import OpenSeadragon from "openseadragon";
import { useOpenSeaDragonContext } from "./OpenSeaDragonContext";

const OpenSeadragonViewer = ({ tileSource, viewPortName }) => {
  const viewerRef = useRef(null); // Reference for the OpenSeadragon container
  const osdViewer = useRef(null);

  const {
    focusedViewPort,
    setFocusViewPort,
    setZoom,
    setPan,
    zoom,
    pan,
    syncState,
    viewPorts,
  } = useOpenSeaDragonContext(); // Reference to store the OpenSeadragon viewer instance

  useEffect(() => {
    const duomo = {
      Image: {
        xmlns: "http://schemas.microsoft.com/deepzoom/2008",
        Url: "https://openseadragon.github.io/example-images/duomo/duomo_files/",
        Format: "jpg",
        Overlap: "1",
        TileSize: "256",
        Size: {
          Width: "13920",
          Height: "10200",
        },
      },
    };

    // Initialize OpenSeadragon viewer when component mounts
    osdViewer.current = OpenSeadragon({
      element: viewerRef.current,
      tileSources: duomo,
      prefixUrl: "https://openseadragon.github.io/openseadragon/images/", // Set control icons URL
      defaultZoomLevel: 1, // Optional: sets the default zoom level
    });

    // register viewer at context lvl
    viewPorts.current = {
      ...viewPorts.current,
      [viewPortName]: osdViewer.current,
    };

    const zoomHandler = (e) => {
      setZoom(e.zoom);
      console.log(e.userData);
    };
    const panHandler = (e) => {
      setPan(e.center);
      console.log(e.userData);
    };
    const addZoomPanEvent = () => {
      setFocusViewPort(viewPortName);
      if (osdViewer.current) {
        osdViewer.current.addHandler("zoom", zoomHandler, { viewPortName });
        osdViewer.current.addHandler("pan", panHandler, { viewPortName });
        console.log("added handlers");
      }
    };
    const removeZoomPanHandler = () => {
      if (osdViewer.current) {
        osdViewer.current.removeHandler("zoom", zoomHandler);
        osdViewer.current.removeHandler("pan", panHandler);
        console.log("removed handlers");
      }
    };

    osdViewer.current.addHandler("container-enter", addZoomPanEvent, {
      viewPortName,
    });

    osdViewer.current.addHandler("container-exit", removeZoomPanHandler, {
      viewPortName,
    });

    // Clean up the viewer instance on component unmount
    return () => {
      if (osdViewer.current) {
        osdViewer.current.destroy();
      }
    };
  }, [tileSource]); // Reinitialize if tileSource changes

  useEffect(() => {
    if (syncState && osdViewer.current && viewPortName !== focusedViewPort) {
      const currentViewPortPan = osdViewer.current.viewport.getCenter();
      const centerOffset = currentViewPortPan.minus(pan);
      console.log(currentViewPortPan, centerOffset, pan);
      osdViewer.current.viewport.panTo(pan);
      console.log("pan handlers");
    }
  }, [pan, syncState]);

  useEffect(() => {
    if (syncState && osdViewer.current && viewPortName !== focusedViewPort) {
      const currentViewPortZoom = osdViewer.current.viewport.getZoom();
      const newZoomChange = zoom / currentViewPortZoom;
      osdViewer.current.viewport.zoomTo(zoom);
      console.log("zoom handlers");
    }
  }, [zoom, syncState]);

  return (
    <div
      style={{
        margin: "20px",
        border: "1px solid black",
      }}
    >
      <div
        ref={viewerRef}
        style={{ width: "600px", height: "600px" }} // Adjust height and width as needed
      />
    </div>
  );
};

export default OpenSeadragonViewer;
