import type { Preset } from '@bdspark/sparkng-themes/types';
import type { ShadcnBaseDesignTokens } from './base/index.d';

import accordion from '@bdspark/sparkng-themes/shadcn/accordion';
import autocomplete from '@bdspark/sparkng-themes/shadcn/autocomplete';
import avatar from '@bdspark/sparkng-themes/shadcn/avatar';
import badge from '@bdspark/sparkng-themes/shadcn/badge';
import base from '@bdspark/sparkng-themes/shadcn/base';
import blockui from '@bdspark/sparkng-themes/shadcn/blockui';
import breadcrumb from '@bdspark/sparkng-themes/shadcn/breadcrumb';
import button from '@bdspark/sparkng-themes/shadcn/button';
import card from '@bdspark/sparkng-themes/shadcn/card';
import carousel from '@bdspark/sparkng-themes/shadcn/carousel';
import cascadeselect from '@bdspark/sparkng-themes/shadcn/cascadeselect';
import checkbox from '@bdspark/sparkng-themes/shadcn/checkbox';
import chip from '@bdspark/sparkng-themes/shadcn/chip';
import colorpicker from '@bdspark/sparkng-themes/shadcn/colorpicker';
import confirmdialog from '@bdspark/sparkng-themes/shadcn/confirmdialog';
import confirmpopup from '@bdspark/sparkng-themes/shadcn/confirmpopup';
import contextmenu from '@bdspark/sparkng-themes/shadcn/contextmenu';
import css from '@bdspark/sparkng-themes/shadcn/css';
import datatable from '@bdspark/sparkng-themes/shadcn/datatable';
import dataview from '@bdspark/sparkng-themes/shadcn/dataview';
import datepicker from '@bdspark/sparkng-themes/shadcn/datepicker';
import dialog from '@bdspark/sparkng-themes/shadcn/dialog';
import divider from '@bdspark/sparkng-themes/shadcn/divider';
import dock from '@bdspark/sparkng-themes/shadcn/dock';
import drawer from '@bdspark/sparkng-themes/shadcn/drawer';
import editor from '@bdspark/sparkng-themes/shadcn/editor';
import fieldset from '@bdspark/sparkng-themes/shadcn/fieldset';
import fileupload from '@bdspark/sparkng-themes/shadcn/fileupload';
import floatlabel from '@bdspark/sparkng-themes/shadcn/floatlabel';
import galleria from '@bdspark/sparkng-themes/shadcn/galleria';
import iconfield from '@bdspark/sparkng-themes/shadcn/iconfield';
import iftalabel from '@bdspark/sparkng-themes/shadcn/iftalabel';
import image from '@bdspark/sparkng-themes/shadcn/image';
import imagecompare from '@bdspark/sparkng-themes/shadcn/imagecompare';
import inlinemessage from '@bdspark/sparkng-themes/shadcn/inlinemessage';
import inplace from '@bdspark/sparkng-themes/shadcn/inplace';
import inputchips from '@bdspark/sparkng-themes/shadcn/inputchips';
import inputgroup from '@bdspark/sparkng-themes/shadcn/inputgroup';
import inputnumber from '@bdspark/sparkng-themes/shadcn/inputnumber';
import inputotp from '@bdspark/sparkng-themes/shadcn/inputotp';
import inputtext from '@bdspark/sparkng-themes/shadcn/inputtext';
import knob from '@bdspark/sparkng-themes/shadcn/knob';
import listbox from '@bdspark/sparkng-themes/shadcn/listbox';
import megamenu from '@bdspark/sparkng-themes/shadcn/megamenu';
import menu from '@bdspark/sparkng-themes/shadcn/menu';
import menubar from '@bdspark/sparkng-themes/shadcn/menubar';
import message from '@bdspark/sparkng-themes/shadcn/message';
import metergroup from '@bdspark/sparkng-themes/shadcn/metergroup';
import multiselect from '@bdspark/sparkng-themes/shadcn/multiselect';
import orderlist from '@bdspark/sparkng-themes/shadcn/orderlist';
import organizationchart from '@bdspark/sparkng-themes/shadcn/organizationchart';
import overlaybadge from '@bdspark/sparkng-themes/shadcn/overlaybadge';
import paginator from '@bdspark/sparkng-themes/shadcn/paginator';
import panel from '@bdspark/sparkng-themes/shadcn/panel';
import panelmenu from '@bdspark/sparkng-themes/shadcn/panelmenu';
import password from '@bdspark/sparkng-themes/shadcn/password';
import picklist from '@bdspark/sparkng-themes/shadcn/picklist';
import popover from '@bdspark/sparkng-themes/shadcn/popover';
import progressbar from '@bdspark/sparkng-themes/shadcn/progressbar';
import progressspinner from '@bdspark/sparkng-themes/shadcn/progressspinner';
import radiobutton from '@bdspark/sparkng-themes/shadcn/radiobutton';
import rating from '@bdspark/sparkng-themes/shadcn/rating';
import ripple from '@bdspark/sparkng-themes/shadcn/ripple';
import scrollpanel from '@bdspark/sparkng-themes/shadcn/scrollpanel';
import select from '@bdspark/sparkng-themes/shadcn/select';
import selectbutton from '@bdspark/sparkng-themes/shadcn/selectbutton';
import skeleton from '@bdspark/sparkng-themes/shadcn/skeleton';
import slider from '@bdspark/sparkng-themes/shadcn/slider';
import speeddial from '@bdspark/sparkng-themes/shadcn/speeddial';
import splitbutton from '@bdspark/sparkng-themes/shadcn/splitbutton';
import splitter from '@bdspark/sparkng-themes/shadcn/splitter';
import stepper from '@bdspark/sparkng-themes/shadcn/stepper';
import steps from '@bdspark/sparkng-themes/shadcn/steps';
import tabmenu from '@bdspark/sparkng-themes/shadcn/tabmenu';
import tabs from '@bdspark/sparkng-themes/shadcn/tabs';
import tabview from '@bdspark/sparkng-themes/shadcn/tabview';
import tag from '@bdspark/sparkng-themes/shadcn/tag';
import terminal from '@bdspark/sparkng-themes/shadcn/terminal';
import textarea from '@bdspark/sparkng-themes/shadcn/textarea';
import tieredmenu from '@bdspark/sparkng-themes/shadcn/tieredmenu';
import timeline from '@bdspark/sparkng-themes/shadcn/timeline';
import toast from '@bdspark/sparkng-themes/shadcn/toast';
import togglebutton from '@bdspark/sparkng-themes/shadcn/togglebutton';
import toggleswitch from '@bdspark/sparkng-themes/shadcn/toggleswitch';
import toolbar from '@bdspark/sparkng-themes/shadcn/toolbar';
import tooltip from '@bdspark/sparkng-themes/shadcn/tooltip';
import tree from '@bdspark/sparkng-themes/shadcn/tree';
import treeselect from '@bdspark/sparkng-themes/shadcn/treeselect';
import treetable from '@bdspark/sparkng-themes/shadcn/treetable';
import virtualscroller from '@bdspark/sparkng-themes/shadcn/virtualscroller';

export default {
    ...base,
    components: {
        accordion,
        autocomplete,
        avatar,
        badge,
        blockui,
        breadcrumb,
        button,
        card,
        carousel,
        cascadeselect,
        checkbox,
        chip,
        colorpicker,
        confirmdialog,
        confirmpopup,
        contextmenu,
        datatable,
        dataview,
        datepicker,
        dialog,
        divider,
        dock,
        drawer,
        editor,
        fieldset,
        fileupload,
        floatlabel,
        galleria,
        iconfield,
        iftalabel,
        image,
        imagecompare,
        inlinemessage,
        inplace,
        inputchips,
        inputgroup,
        inputnumber,
        inputotp,
        inputtext,
        knob,
        listbox,
        megamenu,
        menu,
        menubar,
        message,
        metergroup,
        multiselect,
        orderlist,
        organizationchart,
        overlaybadge,
        paginator,
        panel,
        panelmenu,
        password,
        picklist,
        popover,
        progressbar,
        progressspinner,
        radiobutton,
        rating,
        ripple,
        scrollpanel,
        select,
        selectbutton,
        skeleton,
        slider,
        speeddial,
        splitbutton,
        splitter,
        stepper,
        steps,
        tabmenu,
        tabs,
        tabview,
        tag,
        terminal,
        textarea,
        tieredmenu,
        timeline,
        toast,
        togglebutton,
        toggleswitch,
        toolbar,
        tooltip,
        tree,
        treeselect,
        treetable,
        virtualscroller
    },
    css
} satisfies Preset<ShadcnBaseDesignTokens>;
