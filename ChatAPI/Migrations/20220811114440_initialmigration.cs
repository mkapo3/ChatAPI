using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChatAPI.Migrations
{
    public partial class initialmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    body = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    createdDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    chatId = table.Column<int>(type: "int", nullable: true),
                    isDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.id);
                });

            migrationBuilder.InsertData(
                table: "Messages",
                columns: new[] { "id", "body", "chatId", "createdDate", "isDeleted", "username" },
                values: new object[,]
                {
                    { 1, "Prva poruka", 1, null, false, "PrviKorisnik" },
                    { 2, "Druga poruka", 1, null, false, "DrugiKorisnik" },
                    { 3, "Treca poruka", 1, null, false, "TreciKorisnik" },
                    { 4, "Cetvrta poruka", 1, null, false, "Muharem" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Messages");
        }
    }
}
