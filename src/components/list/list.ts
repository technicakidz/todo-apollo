import { LitElement, html, TemplateResult } from 'lit';
import { ApolloQueryController } from '@apollo-elements/core';
import { customElement } from 'lit/decorators.js';

import { Todos } from './Todos.query.graphql';

import style from './list.css';
import shared from '../shared.css';

declare global { interface HTMLElementTagNameMap { 'todo-list': TodosElement } }

@customElement('todo-list')
export class TodosElement extends LitElement {
  static readonly is = 'todo-list';

  static readonly styles = [shared, style];

  query = new ApolloQueryController(this, Todos);

  render(): TemplateResult {
    return html`
      <pre ?hidden="${!this.query.error}">${this.query.error?.message}</pre>
    `;
  }
}
