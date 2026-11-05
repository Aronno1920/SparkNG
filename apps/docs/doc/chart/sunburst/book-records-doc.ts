import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'book-records-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Book records split into fiction and non-fiction categories and star ratings, glowing on a dark background with outside title labels.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class BookRecordsDoc {
    options = this.buildOptions();

    private buildOptions() {
        const colors = ['#FFAE57', '#FF7853', '#EA5151', '#CC3F57', '#9A2555'];
        const bgColor = '#2E2733';

        const itemStyle: Record<string, { color: string; opacity?: number }> = {
            star5: {
                color: colors[0]
            },
            star4: {
                color: colors[1]
            },
            star3: {
                color: colors[2]
            },
            star2: {
                color: colors[3]
            }
        };

        const data: any = [
            {
                name: 'Fiction',
                itemStyle: {
                    color: colors[1]
                },
                children: [
                    {
                        name: 'Novel',
                        children: [
                            {
                                name: '5☆',
                                children: [
                                    {
                                        name: 'Pain'
                                    },
                                    {
                                        name: 'Mercy'
                                    },
                                    {
                                        name: 'The Tenants Downstairs'
                                    }
                                ]
                            },
                            {
                                name: '4☆',
                                children: [
                                    {
                                        name: 'The Empty Cross'
                                    },
                                    {
                                        name: 'Everything I Never Told You'
                                    },
                                    {
                                        name: "Childhood's End"
                                    }
                                ]
                            },
                            {
                                name: '3☆',
                                children: [
                                    {
                                        name: 'Diary of a Mad Old Man'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Other',
                        children: [
                            {
                                name: '5☆',
                                children: [
                                    {
                                        name: 'The Stories of Vladimir Nabokov'
                                    }
                                ]
                            },
                            {
                                name: '4☆',
                                children: [
                                    {
                                        name: 'Requiem'
                                    },
                                    {
                                        name: "Life: A User's Manual"
                                    }
                                ]
                            },
                            {
                                name: '3☆',
                                children: [
                                    {
                                        name: 'More Than Love, I Need You'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Non-fiction',
                itemStyle: {
                    color: colors[2]
                },
                children: [
                    {
                        name: 'Design',
                        children: [
                            {
                                name: '5☆',
                                children: [
                                    {
                                        name: 'The Best Interface Is No Interface'
                                    }
                                ]
                            },
                            {
                                name: '4☆',
                                children: [
                                    {
                                        name: 'Digital Lighting and Rendering'
                                    },
                                    {
                                        name: 'Anatomy of Japanese Architecture'
                                    }
                                ]
                            },
                            {
                                name: '3☆',
                                children: [
                                    {
                                        name: 'Fantasy World Art\n& RPG Map Drawing'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Social Sciences',
                        children: [
                            {
                                name: '5☆',
                                children: [
                                    {
                                        name: 'Small Data'
                                    }
                                ]
                            },
                            {
                                name: '4☆',
                                children: [
                                    {
                                        name: 'The Effective Executive'
                                    },
                                    {
                                        name: 'Evolution'
                                    },
                                    {
                                        name: 'The Post-Material Age'
                                    }
                                ]
                            },
                            {
                                name: '3☆',
                                children: [
                                    {
                                        name: 'Madness and Civilization'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Psychology',
                        children: [
                            {
                                name: '5☆',
                                children: [
                                    {
                                        name: 'The Neurotic Personality of Our Time'
                                    }
                                ]
                            },
                            {
                                name: '4☆',
                                children: [
                                    {
                                        name: 'Pygmalion Effect'
                                    },
                                    {
                                        name: 'The Wounded Mind'
                                    }
                                ]
                            },
                            {
                                name: '3☆'
                            },
                            {
                                name: '2☆',
                                children: [
                                    {
                                        name: 'Fascination'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Home Living',
                        children: [
                            {
                                name: '4☆',
                                children: [
                                    {
                                        name: 'Making a House a Home'
                                    },
                                    {
                                        name: 'Living with Only What You Need'
                                    },
                                    {
                                        name: 'Nordic Minimalist Style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Picture Books',
                        children: [
                            {
                                name: '5☆',
                                children: [
                                    {
                                        name: 'Design Poetry'
                                    }
                                ]
                            },
                            {
                                name: '4☆',
                                children: [
                                    {
                                        name: 'If Life Fools You'
                                    },
                                    {
                                        name: "The Naturalist's Guide to Cryptids"
                                    }
                                ]
                            },
                            {
                                name: '3☆',
                                children: [
                                    {
                                        name: 'Direction'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Philosophy',
                        children: [
                            {
                                name: '4☆',
                                children: [
                                    {
                                        name: 'The Wisdom of Life'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Technology',
                        children: [
                            {
                                name: '5☆',
                                children: [
                                    {
                                        name: 'Clean Code'
                                    }
                                ]
                            },
                            {
                                name: '4☆',
                                children: [
                                    {
                                        name: 'Learn Three.js'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        for (let j = 0; j < data.length; ++j) {
            let level1 = data[j].children;
            for (let i = 0; i < level1.length; ++i) {
                let block = level1[i].children;
                let bookScore = [];
                let bookScoreId;
                for (let star = 0; star < block.length; ++star) {
                    let style = (function (name) {
                        switch (name) {
                            case '5☆':
                                bookScoreId = 0;
                                return itemStyle.star5;
                            case '4☆':
                                bookScoreId = 1;
                                return itemStyle.star4;
                            case '3☆':
                                bookScoreId = 2;
                                return itemStyle.star3;
                            case '2☆':
                                bookScoreId = 3;
                                return itemStyle.star2;
                        }
                    })(block[star].name);

                    block[star].label = {
                        color: style.color,
                        downplay: {
                            opacity: 0.5
                        }
                    };

                    if (block[star].children) {
                        style = {
                            opacity: 1,
                            color: style.color
                        };
                        block[star].children.forEach(function (book) {
                            book.value = 1;
                            book.itemStyle = style;

                            book.label = {
                                color: style.color
                            };

                            let value = 1;
                            if (bookScoreId === 0 || bookScoreId === 3) {
                                value = 5;
                            }

                            if (bookScore[bookScoreId]) {
                                bookScore[bookScoreId].value += value;
                            } else {
                                bookScore[bookScoreId] = {
                                    color: colors[bookScoreId],
                                    value: value
                                };
                            }
                        });
                    }
                }

                level1[i].itemStyle = {
                    color: data[j].itemStyle.color
                };
            }
        }

        return {
            backgroundColor: bgColor,
            color: colors,
            series: [
                {
                    type: 'sunburst',
                    center: ['50%', '48%'],
                    data: data,
                    sort: function (a, b) {
                        if (a.depth === 1) {
                            return b.getValue() - a.getValue();
                        } else {
                            return a.dataIndex - b.dataIndex;
                        }
                    },
                    label: {
                        rotate: 'radial',
                        color: bgColor
                    },
                    itemStyle: {
                        borderColor: bgColor,
                        borderWidth: 2
                    },
                    levels: [
                        {},
                        {
                            r0: 0,
                            r: 40,
                            label: {
                                rotate: 0
                            }
                        },
                        {
                            r0: 40,
                            r: 105
                        },
                        {
                            r0: 115,
                            r: 140,
                            itemStyle: {
                                shadowBlur: 2,
                                shadowColor: colors[2],
                                color: 'transparent'
                            },
                            label: {
                                rotate: 'tangential',
                                fontSize: 10,
                                color: colors[0]
                            }
                        },
                        {
                            r0: 140,
                            r: 145,
                            itemStyle: {
                                shadowBlur: 80,
                                shadowColor: colors[0]
                            },
                            label: {
                                position: 'outside',
                                textShadowBlur: 5,
                                textShadowColor: '#333'
                            },
                            downplay: {
                                label: {
                                    opacity: 0.5
                                }
                            }
                        }
                    ]
                }
            ]
        };
    }
}
