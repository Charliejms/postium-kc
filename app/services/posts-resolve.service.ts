import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { Post } from "../models/post";
import { PostService } from "./post.service";

@Injectable()
export class PostsResolve implements Resolve<Post[]> {

    constructor(private _postService: PostService) { }
    //INFO Resolving route Data angular 2
    // http://blog.thoughtram.io/angular/2016/10/10/resolving-route-data-in-angular-2.html
    resolve(route: ActivatedRouteSnapshot): Observable<Post[]> {

        let postList: Observable<Post[]> = new Observable();

        switch (route.routeConfig.component.name){
            /*-----------------------------------------------------------------------------------------|
            | ~~~ Red Path ~~~                                                                        |
            |-----------------------------------------------------------------------------------------|
            | Modifica este Resolve para que, en caso de tener que obtener los posts correspondientes |
            | a un usuario, llame a la función 'getUserPosts()' del servicio PostService. Recuerda    |
            | mirar en los parámetros de la ruta, a ver qué encuentras.                               |
            |-----------------------------------------------------------------------------------------*/
            case "UserPostsComponent":
                postList = this._postService.getUserPosts(route.params['userId']);
                break;
            /*-----------------------------------------------------------------------------------------|
            | ~~~ Yellow Path ~~~                                                                     |
            |-----------------------------------------------------------------------------------------|
            | Modifica este Resolve para que, en caso de tener que obtener los posts correspondientes |
            | a una categoría, llame a la función 'getCategoryPosts()' del servicio PostService.      |
            | Recuerda mirar en los parámetros de la ruta, a ver qué encuentras.                      |
            |-----------------------------------------------------------------------------------------*/
            case  "CategoryPostsComponent": 
                postList = this._postService.getCategoryPosts(route.params['categoryId']); 
                break;

            default:
                postList = this._postService.getPosts();

        }

        return postList;
    }
}
