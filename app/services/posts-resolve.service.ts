import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { Post } from "../models/post";
import { PostService } from "./post.service";

@Injectable()
export class PostsResolve implements Resolve<Post[]> {

    constructor(private _postService: PostService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Post[]> {

        let postList: Observable<Post[]> = new Observable();

        switch (route.routeConfig.component.name){
            case "UserPostsComponent":

                postList = this._postService.getUserPosts(route.params['userId']);
                break;

            default:
                postList = this._postService.getPosts();

        }

        /*-----------------------------------------------------------------------------------------|
         | ~~~ Red Path ~~~                                                                        |
         |-----------------------------------------------------------------------------------------|
         | Modifica este Resolve para que, en caso de tener que obtener los posts correspondientes |
         | a un usuario, llame a la función 'getUserPosts()' del servicio PostService. Recuerda    |
         | mirar en los parámetros de la ruta, a ver qué encuentras.                               |
         |-----------------------------------------------------------------------------------------*/
        // http://blog.thoughtram.io/angular/2016/10/10/resolving-route-data-in-angular-2.html

        /*-----------------------------------------------------------------------------------------|
         | ~~~ Yellow Path ~~~                                                                     |
         |-----------------------------------------------------------------------------------------|
         | Modifica este Resolve para que, en caso de tener que obtener los posts correspondientes |
         | a una categoría, llame a la función 'getCategoryPosts()' del servicio PostService.      |
         | Recuerda mirar en los parámetros de la ruta, a ver qué encuentras.                      |
         |-----------------------------------------------------------------------------------------*/

        return postList;
    }
}
