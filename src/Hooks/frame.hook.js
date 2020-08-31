import React, {useState} from 'react';

export const useFrameContext = () => {
    const [isLoading, updateIsLoading] = useState(false);

    const setIsLoading = React.useCallback(() => {
        updateIsLoading(true);
    }, []);

    const unsetIsLoading = React.useCallback(() => {
        updateIsLoading(false);
    }, []);

    return {
        isLoading,
        setIsLoading,
        unsetIsLoading
    };
};
