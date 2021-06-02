import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Idea, IdeaTag } from '@ccal-apps/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IdeaTagsState } from '../_stores/idea-tags.state';
import { IdeasState } from '../_stores/ideas.state';
import { CreateIdea, RemoveIdea, UpdateIdea } from '../_stores/ideas.actions';
import { map, switchMap, take } from 'rxjs/operators';
@Component({
  templateUrl: './ideas-edit.page.html',
  styleUrls: ['./ideas-edit.page.scss'],
})
export class IdeasEditPage implements OnInit {
  idea$: Observable<Idea>;

  @Select(IdeaTagsState)
  ideaTags$: Observable<IdeaTag[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    this.idea$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('ideaId')),
      switchMap((ideaId) => this.store.select(IdeasState.getIdeaById(ideaId))),
      take(1)
    );
  }

  deleteIdea(ideaId: string): void {
    this.store.dispatch(new RemoveIdea(ideaId));
    this.backToIdeas();
  }

  backToIdeas(): void {
    this.router.navigate(['/ideas']);
  }

  createIdea(idea: Idea): void {
    this.store.dispatch(new CreateIdea(idea));
    this.backToIdeas();
  }

  updateIdea(idea: Idea): void {
    this.store.dispatch(new UpdateIdea(idea));
    this.backToIdeas();
  }
}
