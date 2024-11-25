import { inject, Injectable } from "@angular/core";
import { Label } from "./types";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LabelService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/labels';

  // Get all labels
  getAllLabels(): Observable<Label[]> {
    return this.http.get<Label[]>(this.apiUrl);
  }

  // Create a new label
  createLabel(label: Omit<Label, 'id'>): Observable<Label> {
    return this.http.post<Label>(this.apiUrl, label);
  }
}
