import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from './post.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string) {

    const postData: Post = {title: title, content: content};

    this.http.post<{ name: string }>('https://learningangular-93eb0-default-rtdb.firebaseio.com/posts.json', postData).subscribe(responseData => {
      console.log(responseData);
    });
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>('https://learningangular-93eb0-default-rtdb.firebaseio.com/posts.json').pipe(map((responseData) => {
      const postsArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({...responseData[key], id: key});
        }
      }
      return postsArray;
    }));
  }

  clearPosts() {
    return this.http.delete('https://learningangular-93eb0-default-rtdb.firebaseio.com/posts.json');
  }
}
