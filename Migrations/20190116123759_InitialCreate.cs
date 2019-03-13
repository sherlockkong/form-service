using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace formservice.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Forms",
                columns: table => new
                {
                    FormId = table.Column<string>(nullable: false),
                    Header = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Webhook = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false),
                    Settings = table.Column<string>(nullable: false),
                    FieldsCount = table.Column<int>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false),
                    Updated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Forms", x => x.FormId);
                });

            migrationBuilder.CreateTable(
                name: "Fields",
                columns: table => new
                {
                    FieldId = table.Column<string>(nullable: false),
                    Index = table.Column<int>(nullable: false),
                    Type = table.Column<string>(nullable: false),
                    Detail = table.Column<string>(nullable: false),
                    FormId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fields", x => x.FieldId);
                    table.ForeignKey(
                        name: "ForeignKey_Field_Form",
                        column: x => x.FormId,
                        principalTable: "Forms",
                        principalColumn: "FormId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FormData",
                columns: table => new
                {
                    FormDataId = table.Column<string>(nullable: false),
                    Ip = table.Column<string>(nullable: false),
                    UserAgent = table.Column<string>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: false),
                    Updated = table.Column<DateTime>(nullable: false),
                    FormId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormData", x => x.FormDataId);
                    table.ForeignKey(
                        name: "ForeignKey_FormData_Form",
                        column: x => x.FormId,
                        principalTable: "Forms",
                        principalColumn: "FormId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FormHistories",
                columns: table => new
                {
                    FormHistoryId = table.Column<string>(nullable: false),
                    Fields = table.Column<string>(nullable: false),
                    Updated = table.Column<DateTime>(nullable: false),
                    FormId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormHistories", x => x.FormHistoryId);
                    table.ForeignKey(
                        name: "ForeignKey_FormHistory_Form",
                        column: x => x.FormId,
                        principalTable: "Forms",
                        principalColumn: "FormId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FieldData",
                columns: table => new
                {
                    FieldDataId = table.Column<string>(nullable: false),
                    FieldId = table.Column<string>(nullable: false),
                    FormId = table.Column<string>(nullable: false),
                    Data = table.Column<string>(nullable: false),
                    FormDataId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FieldData", x => x.FieldDataId);
                    table.ForeignKey(
                        name: "ForeignKey_FieldData_FormData",
                        column: x => x.FormDataId,
                        principalTable: "FormData",
                        principalColumn: "FormDataId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FormDataHistories",
                columns: table => new
                {
                    FormDataHistoryId = table.Column<string>(nullable: false),
                    Ip = table.Column<string>(nullable: false),
                    UserAgent = table.Column<string>(nullable: false),
                    FieldDataList = table.Column<string>(nullable: false),
                    Updated = table.Column<DateTime>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: false),
                    FormDataId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormDataHistories", x => x.FormDataHistoryId);
                    table.ForeignKey(
                        name: "ForeignKey_FormDataHistory_FormData",
                        column: x => x.FormDataId,
                        principalTable: "FormData",
                        principalColumn: "FormDataId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "Index_FieldData_FormDataId",
                table: "FieldData",
                column: "FormDataId");

            migrationBuilder.CreateIndex(
                name: "Index_FieldData_FormId_And_FieldId",
                table: "FieldData",
                columns: new[] { "FormId", "FieldId" });

            migrationBuilder.CreateIndex(
                name: "Index_Field_FormId",
                table: "Fields",
                column: "FormId");

            migrationBuilder.CreateIndex(
                name: "Index_FormData_FormId",
                table: "FormData",
                column: "FormId");

            migrationBuilder.CreateIndex(
                name: "Index_FormDataHistory_FormDataId",
                table: "FormDataHistories",
                column: "FormDataId");

            migrationBuilder.CreateIndex(
                name: "Index_FormHistory_FormId",
                table: "FormHistories",
                column: "FormId");

            migrationBuilder.CreateIndex(
                name: "Index_Form_FormId",
                table: "Forms",
                column: "FormId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FieldData");

            migrationBuilder.DropTable(
                name: "Fields");

            migrationBuilder.DropTable(
                name: "FormDataHistories");

            migrationBuilder.DropTable(
                name: "FormHistories");

            migrationBuilder.DropTable(
                name: "FormData");

            migrationBuilder.DropTable(
                name: "Forms");
        }
    }
}
