import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FilterIdeasById, FilterIdeasByTags, SortIdeasByDate, SortIdeasByName } from '../../../_stores/ideas.actions';
import { Idea, IdeaTag } from '@ccal-apps/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface IdeaTagFromControls extends IdeaTag {
  checked: boolean;
}

@Component({
  selector: 'ccal-ideas-filters',
  templateUrl: './ideas-filters.component.html',
  styleUrls: ['./ideas-filters.component.scss']
})
export class IdeasFiltersComponent implements OnInit {

  checkedTagIds: string[] = [];
  number: number;

  @Input()
  ideas: Idea[];

  ideasInitValues: Idea[];

  @Input()
  ideaTags: IdeaTag[] = [];
  ideaTagFromControls: IdeaTagFromControls[] = [];

  ideaForm = new FormGroup({
    tagIds: new FormControl([]),
  });

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.ideasInitValues = this.ideas.slice();
    this.ideaTags.forEach(tag => {
      this.ideaTagFromControls.push({...tag, checked: null});
    });
  }

  onTagChange(): void {
    let filteredTags = this.ideaTagFromControls.filter(tag => tag.checked === true);
    let tagIds = filteredTags.map(tag => tag.id);
    this.filterByTag(tagIds);
  }

  onNumberChange(number: number): void {
    let ideaId;
    if(number !== null) {
      ideaId = 'idea-' + number;
    } else {
      ideaId = null;
    }
    this.store.dispatch(new FilterIdeasById(this.ideasInitValues, ideaId));
  }

  sortByDate() {
    this.store.dispatch(new SortIdeasByDate(this.ideas));
  }

  sortByName() {
    this.store.dispatch(new SortIdeasByName(this.ideas));
  }

  filterByTag(tagIds: string[]) {
    this.store.dispatch(new FilterIdeasByTags(this.ideasInitValues, tagIds));
  }

}
