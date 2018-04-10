using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Tms.DataLayer.Migrations
{
    public partial class EmployeerTimeStamp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmployeeEntities",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    MiddleName = table.Column<string>(nullable: true),
                    PassHash = table.Column<string>(nullable: true),
                    Role = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeEntities", x => x.Id);
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
