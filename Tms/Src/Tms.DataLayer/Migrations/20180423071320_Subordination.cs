using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Tms.DataLayer.Migrations
{
    public partial class Subordination : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Blocked",
                table: "EmployeeEntities",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "DepartmentDirectorId",
                table: "EmployeeEntities",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DirectorId",
                table: "EmployeeEntities",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "XrmId",
                table: "EmployeeEntities",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeEntities_DepartmentDirectorId",
                table: "EmployeeEntities",
                column: "DepartmentDirectorId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeEntities_DirectorId",
                table: "EmployeeEntities",
                column: "DirectorId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeEntities_EmployeeEntities_DepartmentDirectorId",
                table: "EmployeeEntities",
                column: "DepartmentDirectorId",
                principalTable: "EmployeeEntities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeEntities_EmployeeEntities_DirectorId",
                table: "EmployeeEntities",
                column: "DirectorId",
                principalTable: "EmployeeEntities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeEntities_EmployeeEntities_DepartmentDirectorId",
                table: "EmployeeEntities");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeEntities_EmployeeEntities_DirectorId",
                table: "EmployeeEntities");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeEntities_DepartmentDirectorId",
                table: "EmployeeEntities");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeEntities_DirectorId",
                table: "EmployeeEntities");

            migrationBuilder.DropColumn(
                name: "Blocked",
                table: "EmployeeEntities");

            migrationBuilder.DropColumn(
                name: "DepartmentDirectorId",
                table: "EmployeeEntities");

            migrationBuilder.DropColumn(
                name: "DirectorId",
                table: "EmployeeEntities");

            migrationBuilder.DropColumn(
                name: "XrmId",
                table: "EmployeeEntities");
        }
    }
}
