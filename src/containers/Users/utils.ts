import { RefValues, User } from './types.ts';

export const buildUpdateSettingsBody = (refValues: RefValues, user?: User) => {
  return {
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
      fileName: refValues.audioName,
    },
    image: {
      base64: refValues.image,
      fileName: refValues.imageName,
    },
    useProductImages: refValues.useProductImages,
  };
};
