import { GenericValidators } from './../../../shared/validators/generic-validators';
import { CategoryDto } from './../../../responses/category/models/categoryDto.interface';
import { TableColumn } from './../../../../@vex/interfaces/table-column.interface';
import icCategory from '@iconify/icons-ic/twotone-category';
import { ListTableMenu } from 'src/app/commons/list-table-menu.interface';
import icViewHeadLine from '@iconify/icons-ic/twotone-view-headline';
import icLabel from '@iconify/icons-ic/twotone-label';
import icCalendarToday from '@iconify/icons-ic/twotone-calendar-today';

const searchOptions=[
    {
        label:"Nombre",
        value: 1,
        placeholder: "Buscar por nombre",
        validation: [GenericValidators.defaultName],
        validation_desc: "Solo se permite caracteres alfanuméricos!",
        min_length: 2
    },
    {
        label:"Descripción",
        value: 2,
        placeholder: "Buscar por descripción",
        validation: [GenericValidators.defaultDescription],
        validation_desc: "Solo se permite caracteres alfanuméricos!",
        min_length: 2
    }
]

const menuItems: ListTableMenu[]=[
    {
        type: "link",
        id: "all",
        icon: icViewHeadLine,
        label: "Todos"
    },
    {
        type: "link",
        id: "Activo",
        value: 1,
        icon: icLabel,
        label: "Activo",
        classes: {
            icon: "text-green"
        }
    },
    {
        type: "link",
        id: "Inactivo",
        value: 0,
        icon: icLabel,
        label: "Inactivo",
        classes: {
            icon: "text-gray"
        }
    }
]


const tableColumns: TableColumn<CategoryDto>[] = [
    {
        label: "Nombre",
        property: "name",
        type: "text",
        cssClasses: ['font-medium', 'w-10']
    },
    {
        label: "Descripción",
        property: "description",
        type: "textTruncate",
        cssClasses: ['font-medium', 'w-10']
    },
    {
        label: "Fecha creación",
        property: "auditCreateDate",
        type: "datetime",
        cssClasses: ['font-medium', 'w-10']
    },
    {
        label: "Estado",
        property: "stateCategory",
        type: "badge",
        cssClasses: ['font-medium', 'w-10']
    },
    {
        label: "Acciones",
        property: "menu",
        type: "buttonGroup",
        buttonItems:[
            {
                buttonLabel: 'Editar',
                buttonAction: 'edit',
                buttonCondition: '',
                disable:false
            },
            {
                buttonLabel: 'Eliminar',
                buttonAction: 'remove',
                buttonCondition: '',
                disable:false
            }
        ],
        cssClasses: ['font-medium', 'w-10']
    }
]

const filters ={
    numberFilter:0,
    textFilter:"",
    stateFilter: null,
    startDate: null,
    endDate: null
}

const inputs ={
    numberFilter:0,
    textFilter:"",
    stateFilter: null,
    startDate: null,
    endDate: null
}

export const componentSettings = {
    //ICONS
    icCategory: icCategory,
    icCalendarToday: icCalendarToday,
    //LAYOUT SETTINGS
    menuOpen: false,
    //TABLE SETTINGS
    tableColumns: tableColumns,
    initialSort: 'Id',
    initialSortDir: 'desc',
    getInputs:inputs,
    buttonLabel: 'EDITAR',
    buttonLabel2: 'ELIMINAR',
    //SEARCH FILTERS
    menuItems: menuItems,
    searchOptions:searchOptions,
    filters_dates_active: false,
    filters: filters,
    datesFilterArray: 'Fecha de creación',
    columnsFilter: tableColumns.map((column) =>{return {label: column.label, property:column.property, type:column.type}})
}