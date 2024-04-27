import { RefValues, User } from './types.ts';

export const buildPostBody = (refValues: RefValues, user?: User) => {
  return {
    ...user,
    isBlocked: refValues.isBlocked,
    settings: {
      ...user?.settings,
      text: {
        ...user?.settings.text,
        content: refValues.textContent,
        specialColor: refValues.textSpecialColor,
      },
      display: {
        ...user?.settings.display,
        duration: refValues.duration,
        animationIn: refValues.animationIn,
        animationOut: refValues.animationOut,
      },
      audio: {
        ...user?.settings.audio,
        volume: refValues.volume,
        base64: refValues.audio,
      },
      image: {
        base64: refValues.image,
      },
      useProductImages: refValues.useProductImages,
    },
  };
};
