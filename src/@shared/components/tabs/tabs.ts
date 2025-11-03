import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { TabComponent } from './tab';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  active = '';

  ngAfterContentInit() {
    const first = this.tabs.first;
    if (first) this.select(first.title);
  }

  select(title: string) {
    this.active = title;
    this.tabs.forEach(tab => tab.active = tab.title === title);
  }
}
