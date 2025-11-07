import { Component, Directive, ElementRef, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from "@angular/core";

@Component({
    selector: 'skeleton-rect', template: ``,
    styleUrl: './skeleton.scss'
}) export class SkeletonRect {
    width: string = '0'; height: string = '0'; className: string[] = ['']
    constructor(private host: ElementRef<HTMLElement>) { }
    ngOnInit() {
        const host = this.host.nativeElement;
        if (this.className) {
            this.className.forEach(c => {
                host.classList.add(c);
            })
        }
    }
}

@Directive({ selector: '[skeleton]' })
export class SkeletonDirective implements OnChanges {
    @Input('skeleton') source: any;
    @Input('skeletonSize') size = 1;
    @Input('skeletonClassName') className: string[] = [''];

    constructor(private tpl: TemplateRef<any>, private vcr: ViewContainerRef) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.render(changes['source'].currentValue);
    }

    private render(value: any) {
        console.log(value)
        this.vcr.clear();
        if (value === null || value === undefined || value === true) {
            Array.from({ length: this.size }).forEach(() => {
                const ref = this.vcr.createComponent(SkeletonRect);
                Object.assign(ref.instance, { className: this.className })
            })
        }
        else {
            this.vcr.createEmbeddedView(this.tpl, { $implicit: value });
        }
    }
}