import { Injectable } from '@angular/core';
import {
  State,
  Action,
  StateContext,
  StateToken,
  createSelector,
} from '@ngxs/store';
import { Idea } from '@ccal-apps/core';
import {
  CreateIdea, FilterIdeasById,
  FilterIdeasByTags,
  RemoveIdea,
  SortIdeasByDate,
  SortIdeasByName,
  UpdateIdea
} from './ideas.actions';
import { append, removeItem, updateItem } from '@ngxs/store/operators';

import { filterIdeasByTagIds, getIdeaById, sortIdeasByDate, sortIdeasByName } from '../_utilities/ideas.utilities';
import { getIdeas } from './ideas.data';

export const IDEAS_STATE_TOKEN = new StateToken<Idea[]>('ideas');

@State<Idea[]>({
  name: IDEAS_STATE_TOKEN,
  defaults: getIdeas(0, 100)
})
@Injectable()
export class IdeasState {
  static getIdeaById(ideaId: string) {
    return createSelector([IdeasState], (state: Idea[]) => {
      return state.find((idea) => idea.id === ideaId);
    });
  }

  @Action(CreateIdea)
  addIdea(ctx: StateContext<Idea[]>, action: CreateIdea) {
    return ctx.setState(append([action.idea]));
  }

  @Action(RemoveIdea)
  removeIdea(ctx: StateContext<Idea[]>, action: RemoveIdea) {
    return ctx.setState(removeItem<Idea>((idea) => idea.id === action.ideaId));
  }

  @Action(UpdateIdea)
  updateIdea(ctx: StateContext<Idea[]>, action: UpdateIdea) {
    return ctx.setState(
      updateItem<Idea>((idea) => idea.id === action.idea.id, action.idea)
    );
  }

  @Action(SortIdeasByDate)
  sortIdeasByDate(ctx: StateContext<Idea[]>, action: SortIdeasByDate) {
    return ctx.setState(sortIdeasByDate(action.ideas));
  }

  @Action(SortIdeasByName)
  sortIdeasByName(ctx: StateContext<Idea[]>, action: SortIdeasByName) {
    return ctx.setState(sortIdeasByName(action.ideas));
  }

  @Action(FilterIdeasByTags)
  filterIdeasByTags(ctx: StateContext<Idea[]>, action: FilterIdeasByTags) {
    return ctx.setState(filterIdeasByTagIds(action.ideas, action.tagIds));
  }

  @Action(FilterIdeasById)
  filterIdeasById(ctx: StateContext<Idea[]>, action: FilterIdeasById) {
    return ctx.setState(getIdeaById(action.ideas, action.ideaId));
  }
}
