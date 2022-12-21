import { useEffect, useState } from 'react';

const getManifest = (path: string) => fetch(path).then((response) => response.json());


export const useHandleVersion = (manifestPath?: string) => {
  const [v, setV] = useState('');

  const updateVersion = () => {
    if (manifestPath) {
      getManifest(manifestPath).then((value) => {
        setV(value.v);
        window.setTimeout(() => updateVersion(), 30000);
      }).catch(() => {
        console.log('MANIFEST_ERROR');
      });
    }
  }
  useEffect(() => {
    if (manifestPath) {
      updateVersion();
    } else {
      setV('no_manifest')
    }
  }, [manifestPath]);

  return {
    v,
  };
};