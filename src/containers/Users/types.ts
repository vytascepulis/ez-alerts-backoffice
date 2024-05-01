export interface User {
  uuid: string;
  registeredAt: string;
  shopDomain: string;
  isBlocked: boolean;
  settings: {
    text: {
      content: string;
      specialColor: string;
    };
    display: {
      duration: number;
      animationIn: string;
      animationOut: string;
    };
    audio: {
      fileName: string;
      volume: number;
      base64: string;
    };
    image: {
      fileName: string;
      base64: string;
    };
    useProductImages: boolean;
  };
  isActive: boolean;
  activeClients: string[];
}

export interface RefValues {
  animationIn?: string;
  animationOut?: string;
  duration?: number;
  useProductImages?: boolean;
  image?: string;
  textContent?: string;
  textSpecialColor?: string;
  audio?: string;
  volume?: number;
  imageName?: string;
  audioName?: string;
}
