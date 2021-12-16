import { useState, useEffect } from 'react';
import ReactGA from 'react-ga';

export default function useGaTracker() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!window.location.href.includes("localhost")) {
      ReactGA.initialize("UA-74113004-2");
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, [initialized]);
}