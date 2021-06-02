import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Idea, IdeaTag } from '@ccal-apps/core';

interface IdeaTagFromControls extends IdeaTag {
  checked: boolean;
}

@Component({
  selector: 'ccal-ideas-editor',
  templateUrl: './ideas-editor.component.html',
  styleUrls: ['./ideas-editor.component.scss'],
})
export class IdeasEditorComponent implements OnChanges {
  private _idea: Idea;

  ideaForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    tagIds: new FormControl([]),
    createdAt: new FormControl([])
  });

  @Input()
  set idea(idea: Idea) {
    this._idea = idea;
    this.ideaForm.setValue(idea || IdeasEditorComponent.getNewIdeaFormValues());
  }
  get idea(): Idea {
    return this._idea;
  }

  @Input()
  ideaTags: IdeaTag[] = [];
  ideaTagFromControls: IdeaTagFromControls[] = [];

  @Output()
  createIdea = new EventEmitter<Idea>();

  @Output()
  updateIdea = new EventEmitter<Idea>();

  @Output()
  cancel = new EventEmitter<null>();

  @Output()
  deleteIdea = new EventEmitter<string>();

  static getNewIdeaFormValues(): Idea {
    return {
      id: `idea-${new Date().valueOf()}`,
      name: '',
      description: '',
      tagIds: [],
      createdAt: null,
    };
  }

  ngOnChanges() {
    this.ideaTagFromControls = this.generateIdeaTagFromControls(
      this.ideaTags || [],
      this.idea?.tagIds || []
    );
  }

  onDeleteClick(): void {
    this.deleteIdea.emit(this.ideaForm.get('id').value);
  }

  onCancelClick(): void {
    this.cancel.emit();
  }

  onSaveClick(): void {
    const currentDate = new Date();
    this.ideaForm.patchValue({createdAt: currentDate});
    const ideaPayload = this.ideaForm.value;
    this.idea
      ? this.updateIdea.emit(ideaPayload)
      : this.createIdea.emit(ideaPayload);
  }

  onTagChange(): void {
    this.ideaForm
      .get('tagIds')
      .setValue(
        this.ideaTagFromControls
          .filter((item) => item.checked)
          .map((item) => item.id)
      );
  }

  private generateIdeaTagFromControls(
    ideaTags: IdeaTag[],
    checkedIds: string[]
  ): IdeaTagFromControls[] {
    return ideaTags.map((ideaTag) => {
      return {
        ...ideaTag,
        checked: checkedIds.includes(ideaTag.id),
      };
    });
  }
}
