using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Tms.DataLayer.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmployeeEntities",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Blocked = table.Column<bool>(nullable: false),
                    DepartmentDirectorId = table.Column<Guid>(nullable: true),
                    DirectorId = table.Column<Guid>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    MiddleName = table.Column<string>(nullable: true),
                    PassHash = table.Column<string>(nullable: true),
                    Role = table.Column<int>(nullable: false),
                    XrmId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeEntities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeEntities_EmployeeEntities_DepartmentDirectorId",
                        column: x => x.DepartmentDirectorId,
                        principalTable: "EmployeeEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeEntities_EmployeeEntities_DirectorId",
                        column: x => x.DirectorId,
                        principalTable: "EmployeeEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TimeStampsEntities",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    DbEmployeeId = table.Column<Guid>(nullable: false),
                    WorkedTime = table.Column<TimeSpan>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeStampsEntities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimeStampsEntities_EmployeeEntities_DbEmployeeId",
                        column: x => x.DbEmployeeId,
                        principalTable: "EmployeeEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeEntities_DepartmentDirectorId",
                table: "EmployeeEntities",
                column: "DepartmentDirectorId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeEntities_DirectorId",
                table: "EmployeeEntities",
                column: "DirectorId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeStampsEntities_DbEmployeeId",
                table: "TimeStampsEntities",
                column: "DbEmployeeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TimeStampsEntities");

            migrationBuilder.DropTable(
                name: "EmployeeEntities");
        }
    }
}
