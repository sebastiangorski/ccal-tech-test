import { Component, Input, OnChanges } from '@angular/core';
import { Idea, IdeaTag } from '@ccal-apps/core';

export interface IdeaWithFullTags {
  id: string;
  name: string;
  description: string;
  tagIds: string[];
  createdAt: Date;
  fullTags: IdeaTag[];
}

@Component({
  selector: 'ccal-ideas-listing',
  templateUrl: './ideas-listing.component.html',
  styleUrls: ['./ideas-listing.component.scss'],
})
export class IdeasListingComponent implements OnChanges {

  @Input()
  ideas: Idea[] = [];
  ideasWithTags: IdeaWithFullTags[];

  @Input()
  ideaTags: IdeaTag[] = [];

  ngOnChanges() {
    this.ideasWithTags = this.ideas.map(idea => ({...idea, fullTags: idea.tagIds.map(tagId => this.getTagById(tagId))}));
  }

  getTagById(tagId: string): IdeaTag {
    return this.ideaTags.find((tag) => tag.id === tagId);
  }
}
