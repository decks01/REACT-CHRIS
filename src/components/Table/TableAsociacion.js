import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Prime react
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "./Table.scss";
// import 'primeflex/primeflex.css';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Ripple } from "primereact/ripple";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { IoMdAddCircle } from "react-icons/io";
import { FilterMatchMode, FilterOperator } from "primereact/api";

import {
  locale,
  addLocale,
} from "primereact/api";
import constants from "../../utils/constants";

// COLUMNAS PARA USAR EN VEZ DEL MAP
function Columas() {
  return (
    <>
      <Column field="usuario" header="usuario" sortable></Column>
      <Column
        field="correo_alternativo"
        header="correo_alternativo"
        sortable
      ></Column>
    </>
  );
}

const TableAsociacion = () => {


  var moment = require("moment");
  const [loader, setloader] = useState(true);

  const [first1, setFirst1] = useState(0);
  const [rows1, setRows1] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [data, setdata] = useState([]);

  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [filters1, setFilters1] = useState(null);


  // DATA PARA EL FETCH
  useEffect(() => {
    const fetchServicio = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(constants.api + "asociaciones", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer" + token,
          },
        });
        const result = await response.json();
        setdata(result);
    
      } catch (error) {
        console.log("Estan vacios los campos o esta mal la consulta");
      }
    };
    fetchServicio();
  }, []);

  const onCustomPage1 = (event) => {
    setFirst1(event.first);
    setRows1(event.rows);
    setCurrentPage(event.page + 1);
  };

  // FOOTER TABLA
  const template1 = {
    layout:
      "PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport",
    PrevPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">Anterior</span>
          <Ripple />
        </button>
      );
    },
    NextPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">Siguiente</span>
          <Ripple />
        </button>
      );
    },
    PageLinks: (options) => {
      if (
        (options.view.startPage === options.page &&
          options.view.startPage !== 0) ||
        (options.view.endPage === options.page &&
          options.page + 1 !== options.totalPages)
      ) {
        const className = classNames(options.className, { "p-disabled": true });

        return (
          <span className={className} style={{ userSelect: "none" }}>
            ...
          </span>
        );
      }

      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
        >
          {options.page + 1}
          <Ripple />
        </button>
      );
    },
    RowsPerPageDropdown: (options) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
        { label: "Todo", value: options.totalRecords },
      ];

      return (
        <Dropdown
          value={options.value}
          options={dropdownOptions}
          onChange={options.onChange}
        />
      );
    },
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setloader(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    initFilters1();
  }, []);

  // TEMPLATES PARA ACCCIONES DE ELIMINAR Y EDITAR
  const actionBodyTemplate = (rowData) => {
    return (
      <div key={rowData.ID}>
        <Link to={`/responsiva//editar/`} className="sinunder">
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success mr-2"
          />
        </Link>
        <Link className="sinunder">
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger"
          />
        </Link>
        <Link to={`/pdf/`}>
          <Button
            icon="pi pi-file-pdf"
            className="p-button-rounded p-button-info"
          />
        </Link>
      </div>
    );
  };

  // FORMATEO DE FECHA
  const formatDate = (value) => {
    return moment.utc(value).format("yyyy/MM/DD");
  };
  // TEMPLATE PARA FECHA
  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.fecha_inicio);
  };

  //   INICIALIZAR FILTROS POR TODOS
  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'fecha_inicio': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'colonia': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'num_empleado': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'correos': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    });
    setGlobalFilterValue1("");
  };

  // DATOS PARA CAMBIAR EN ESPAÑOL
  locale("es");
  addLocale("es", {
    firstDayOfWeek: 1,
    dayNames: [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "Mi", "J", "V", "S"],
    monthNames: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
    matchAll: "Todo",
    apply: "aplicar",
    matchAny: "Coincidir con cualquiera",
    dateIs: "Fecha",
    deteNot: "No incluir fecha",
    removeRule: "Remover regla",
    dateBefore: "Fecha antes de",
    dateAfter: "Fecha despues de",
    addRule: "Agregar regla",
    Clear: "Limpiar",
  });




  // BUSQUEDA HEADER, INPUT SEARCH
  const BusquedaHeader = () => {
    return (
      <div className="flex justify-content-between">
        {/* <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Limpiar"
          className="p-button-outlined"
          onClick={clearFilter1}
        /> */}
        <div></div>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          {/* SE LE PASAN PARAMETROS DE BUSQUEDA EL VALUE Y ONCHANGE */}
          <InputText
            value={globalFilterValue1}
            onChange={onGlobalFilterChange1}
            placeholder="Busqueda"
          />
        </span>
      </div>
    );
  };

  const clearFilter1 = () => {
    initFilters1();
  };

  // FILTROS DE BUSQUEDA, POR QUE QUIERES FILTRAR
  const globalFilters = ["colonia", "num_reporte", "fecha_inicio"];

  // ONCHANGE DE BUSQUEDA SEARCH
  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1["global"].value = value;
    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };

  const header1 = BusquedaHeader();

  // DATOS PARA COLUMNS, NOMBRE-TABLA --- NOMBRE QUE SE VE 
  const rows = [
    { field: "secretario", header: "secretario" },
    { field: "colonia", header: "colonia" },
    { field: "presidente", header: "presidente" },
  ];

  return (
    <>
      <div className="table-responsivas">
        {loader ? (
          <div className="loading">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="">
            <div className="add-responsiva">
              <h5>Table de </h5>
              <Link className="sin-underline" to={`/responsiva/agregar`}>
                <button className="btn  btn-responsivas btn-add-registro">
                  <IoMdAddCircle />Agregar Nueva
                </button>
              </Link>
            </div>
            <DataTable
              value={data}
              filterDisplay="menu"
              responsiveLayout="scroll"
              paginator
              dataKey="id"
              filters={filters1}
              paginatorTemplate={template1}
              first={first1}
              rows={rows1}
              onPage={onCustomPage1}
              scrollable
              header={header1}
              scrollHeight="600px"
              emptyMessage="Sin resultados"
              globalFilterFields={globalFilters}
              currentPageReportTemplate="Mostrando de {first} a {last} de {totalRecords}"
            >
              <Column
                field="fecha"
                body={dateBodyTemplate}
                // filterElement={dateFilterTemplate}
                header="Fecha"
                dataType="date"
                exportable={false}
                style={{ minWidth: "8rem" }}
                sortable
                // filter
              ></Column>
              {rows.map((item, key) => {
                return (
              
                  <Column
                    field={item.field}
                    header={item.header}
                    sortable
                  ></Column>
               
                );
              })}

              <Column
                body={actionBodyTemplate}
                // header="editando"
                exportable={false}
                style={{ minWidth: "14rem" }}
              ></Column>
            </DataTable>
          </div>
        )}
      </div>
    </>
  );
};

export default TableAsociacion;
