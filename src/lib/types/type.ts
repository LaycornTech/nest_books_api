



export enum InventoryType {
    Book = "book"
}

export interface PlatformRequest extends Request {
    authPayload: AuthTokenPayload;
  }
  
  export interface AuthTokenPayload {
    user: {
        id: number;
    }
  }