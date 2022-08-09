using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChatAPI.Migrations
{
    public partial class initialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ChatId = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Messages",
                columns: new[] { "Id", "Body", "ChatId", "CreatedDate", "IsDeleted", "UserName" },
                values: new object[] { 1, "Prva poruka", null, null, null, null });

            migrationBuilder.InsertData(
                table: "Messages",
                columns: new[] { "Id", "Body", "ChatId", "CreatedDate", "IsDeleted", "UserName" },
                values: new object[] { 2, "Druga poruka", null, null, null, null });

            migrationBuilder.InsertData(
                table: "Messages",
                columns: new[] { "Id", "Body", "ChatId", "CreatedDate", "IsDeleted", "UserName" },
                values: new object[] { 3, "Treca poruka", null, null, null, null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Messages");
        }
    }
}
