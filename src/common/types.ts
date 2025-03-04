export interface SparrowIQProps {
    FileType: string[];
    config: {
        API_KEY: string;
        UPLOAD_URL: string;
        GENERATE_URL: string;
    };
  }
  
export interface SparrowIQState {
    file: File | null;
    requirement: string;
    entities: SparrowIQEntity[];
  }
  
export interface SparrowIQEntity {
    id: number;
    name: string;
    type: string;
}
