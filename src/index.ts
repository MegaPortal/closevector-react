import { useEffect, useState } from 'react';
import { CloseVectorManager } from 'closevector-web';

export const useCloseVectorManager = function (options: Pick<ConstructorParameters<typeof CloseVectorManager>[0], 'accessKey' | 'uuid' | 'customEmbeddings'>) {

    const [manager, setManager] = useState<CloseVectorManager | null>(null);
    const [downloadProgress, setDownloadProgress] = useState<number>(0);

    function getInstance() {
        if (!manager) {
            throw new Error("manager is not initialized");
        }
        return manager.lib;
    }

    useEffect(() => {
        const manager = new CloseVectorManager({
            ...options,
            onProgress: (progress) => {
                const p = progress.loaded / progress.total;
                setDownloadProgress(p);
            }
        });
        setManager(manager);
    }, []);

    return {
        manager,
        downloadProgress,
        getInstance
    };
}