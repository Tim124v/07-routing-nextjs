export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
  tag?: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}
