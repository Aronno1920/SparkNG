import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
    selector: 'api-doc',
    standalone: true,
    imports: [CommonModule, AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>Generated reference for Angular Scheduler inputs, outputs, methods, definitions, and types as specified in the PrimeUI Pro / SparkNG API specifications.</p>
        </app-docsectiontext>

        <!-- Import Section -->
        <h3 class="doc-section-title" id="api.import">Import</h3>
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>

        <!-- Inputs Section -->
        <h3 class="doc-section-title" id="api.inputs">Inputs ({{ inputs.length }})</h3>
        <p>Defines the input properties and configurations of the Scheduler component.</p>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    @for (prop of inputs; track prop.name) {
                        <tr>
                            <td>
                                <span class="doc-prop-name font-semibold text-primary">{{ prop.name }}</span>
                            </td>
                            <td>
                                <code class="doc-type">{{ prop.type }}</code>
                            </td>
                            <td>
                                <code>{{ prop.default }}</code>
                            </td>
                            <td>{{ prop.description }}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>

        <!-- Outputs Section -->
        <h3 class="doc-section-title" id="api.outputs">Outputs ({{ emits.length }})</h3>
        <p>Defines event emitters and callback payloads of the Scheduler component.</p>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Parameters</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    @for (emit of emits; track emit.name) {
                        <tr>
                            <td>
                                <span class="doc-prop-name font-semibold text-primary">{{ emit.name }}</span>
                            </td>
                            <td>
                                @for (p of emit.parameters; track p.name) {
                                    <code>{{ p.name }}: {{ p.type }}</code>
                                }
                            </td>
                            <td>{{ emit.description }}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>

        <!-- Methods Section -->
        <h3 class="doc-section-title" id="api.methods">Methods ({{ methods.length }})</h3>
        <p>Defines public methods callable on the Scheduler component reference.</p>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Parameters</th>
                        <th>Return</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    @for (m of methods; track m.name) {
                        <tr>
                            <td>
                                <span class="doc-prop-name font-semibold text-primary">{{ m.name }}</span>
                            </td>
                            <td>
                                @if (m.parameters.length === 0) {
                                    <span>-</span>
                                } @else {
                                    @for (p of m.parameters; track p.name) {
                                        <code>{{ p.name }}: {{ p.type }}</code>
                                    }
                                }
                            </td>
                            <td>
                                <code>{{ m.return }}</code>
                            </td>
                            <td>{{ m.description }}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>

        <!-- Interfaces Section -->
        <h3 class="doc-section-title" id="api.interfaces">Interfaces ({{ interfaces.length }})</h3>
        <p>Defines custom interfaces and data models used by the Scheduler module.</p>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Interface</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    @for (iface of interfaces; track iface.name) {
                        <tr>
                            <td>
                                <span class="doc-prop-name font-semibold text-primary">{{ iface.name }}</span>
                            </td>
                            <td>{{ iface.description }}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>

        <!-- Types Section -->
        <h3 class="doc-section-title" id="api.types">Types ({{ types.length }})</h3>
        <p>Defines custom union and alias types used by the Scheduler module.</p>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    @for (t of types; track t.name) {
                        <tr>
                            <td>
                                <span class="doc-prop-name font-semibold text-primary">{{ t.name }}</span>
                            </td>
                            <td>
                                <code class="doc-type">{{ t.value }}</code>
                            </td>
                            <td>{{ t.description }}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    `
})
export class ApiDoc {
    importCode = {
        basic: `import { SchedulerModule } from '@bdspark/sparkng/scheduler';
import type { SchedulerEvent, SchedulerResource, SchedulerViewType } from '@bdspark/sparkng/types/scheduler';`
    };

    readonly inputs: any[] = [];
    readonly emits: any[] = [];
    readonly methods: any[] = [];
    readonly interfaces: any[] = [];
    readonly types: any[] = [];
}
