import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'accessibility-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText],
    template: ` <div>
        <app-docsectiontext>
            <div class="doc-section-description">
                <h3>Screen Reader</h3>
                <p>Charts render an accessible container with <i>role="img"</i>; describe the visualization for screen readers using the <i>ariaLabel</i> or <i>ariaLabelledBy</i> properties.</p>
            </div>
        </app-docsectiontext>
        <app-code [hideToggleCode]="true"></app-code>
    </div>`
})
export class AccessibilityDoc {}
